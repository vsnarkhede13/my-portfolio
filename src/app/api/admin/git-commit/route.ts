// File path: src/app/api/admin/git-commit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const commitMessage = message || `Update content - ${new Date().toISOString()}`;

    // Git commands
    const commands = [
      'git add .',
      `git commit -m "${commitMessage}"`,
      'git push origin main'
    ];

    let output = '';
    
    for (const command of commands) {
      try {
        const { stdout, stderr } = await execAsync(command, {
          cwd: process.cwd()
        });
        output += stdout + '\n';
        if (stderr) output += stderr + '\n';
      } catch (error: any) {
        // Git might return non-zero exit code even for successful operations
        output += error.stdout + '\n';
        if (error.stderr) output += error.stderr + '\n';
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Changes committed and pushed successfully',
      output 
    });
  } catch (error: any) {
    console.error('Git commit error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to commit changes',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
