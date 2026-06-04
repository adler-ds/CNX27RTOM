import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Login {
  id: number;
  url: string;
  username: string;
  password: string;
  assigned: boolean;
  assignedTo: string | null;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'logins.json');

function readLogins(): Login[] {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function writeLogins(logins: Login[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logins, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const logins = readLogins();

    // Check if email already has an assignment
    const existingAssignment = logins.find(
      (login) => login.assignedTo === email
    );

    if (existingAssignment) {
      return NextResponse.json({
        success: true,
        login: {
          url: existingAssignment.url,
          username: existingAssignment.username,
          password: existingAssignment.password,
        },
        message: 'Returning your existing assignment',
      });
    }

    // Find first unassigned login
    const availableLogin = logins.find((login) => !login.assigned);

    if (!availableLogin) {
      return NextResponse.json(
        { error: 'No available logins remaining' },
        { status: 404 }
      );
    }

    // Assign the login
    availableLogin.assigned = true;
    availableLogin.assignedTo = email;

    writeLogins(logins);

    return NextResponse.json({
      success: true,
      login: {
        url: availableLogin.url,
        username: availableLogin.username,
        password: availableLogin.password,
      },
      message: 'New login assigned successfully',
    });
  } catch (error) {
    console.error('Error assigning login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
