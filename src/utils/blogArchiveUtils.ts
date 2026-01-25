// src/utils/blogArchiveUtils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WeekPost {
  week: string;
  slug: string;
  title: string;
}

export interface MonthArchive {
  name: string;
  slug: string;
  weeks: WeekPost[];
}

export interface YearArchive {
  year: string;
  months: MonthArchive[];
}

export async function getBlogArchiveStructure(): Promise<YearArchive[]> {
  if (typeof window !== 'undefined') {
    return [];
  }

  try {
    const contentDir = path.join(process.cwd(), 'src', 'content', 'blogs');
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    
    // Parse all files and extract date information
    const archiveMap = new Map<string, Map<string, Map<string, WeekPost[]>>>();

    mdxFiles.forEach((file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      // Extract year, month, week from filename: 2026-01-week1-title.mdx
      const match = file.match(/^(\d{4})-(\d{2})-week(\d+)-(.+)\.mdx?$/);
      
      if (match) {
        const [, year, monthNum, weekNum, titleSlug] = match;
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[parseInt(monthNum) - 1];
        const weekLabel = `Week ${weekNum}`;
        
        const slug = file
          .replace(/^\d{4}-\d{2}-week\d+-/, '')
          .replace(/\.mdx?$/, '');

        // Build nested structure
        if (!archiveMap.has(year)) {
          archiveMap.set(year, new Map());
        }
        
        const yearMap = archiveMap.get(year)!;
        if (!yearMap.has(monthName)) {
          yearMap.set(monthName, new Map());
        }
        
        const monthMap = yearMap.get(monthName)!;
        if (!monthMap.has(weekLabel)) {
          monthMap.set(weekLabel, []);
        }
        
        monthMap.get(weekLabel)!.push({
          week: weekLabel,
          slug: slug,
          title: data.title || titleSlug.replace(/-/g, ' '),
        });
      }
    });

    // Convert map structure to array format
    const archive: YearArchive[] = [];

    // Sort years in descending order (newest first)
    const sortedYears = Array.from(archiveMap.keys()).sort((a, b) => parseInt(b) - parseInt(a));

    sortedYears.forEach(year => {
      const yearMap = archiveMap.get(year)!;
      const months: MonthArchive[] = [];

      // Sort months chronologically
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      const sortedMonths = Array.from(yearMap.keys()).sort((a, b) => {
        return monthNames.indexOf(b) - monthNames.indexOf(a); // Newest first
      });

      sortedMonths.forEach(monthName => {
        const monthMap = yearMap.get(monthName)!;
        const weeks: WeekPost[] = [];

        // Sort weeks
        const sortedWeeks = Array.from(monthMap.keys()).sort((a, b) => {
          const weekA = parseInt(a.replace('Week ', ''));
          const weekB = parseInt(b.replace('Week ', ''));
          return weekB - weekA; // Newest first
        });

        sortedWeeks.forEach(weekLabel => {
          const posts = monthMap.get(weekLabel)!;
          posts.forEach(post => {
            weeks.push(post);
          });
        });

        months.push({
          name: monthName,
          slug: monthName.toLowerCase(),
          weeks: weeks,
        });
      });

      archive.push({
        year: year,
        months: months,
      });
    });

    return archive;
    
  } catch (error) {
    console.error('Error building blog archive:', error);
    return [];
  }
}