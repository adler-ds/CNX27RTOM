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
    const { loginId } = await request.json();

    if (loginId === undefined) {
      return NextResponse.json(
        { error: 'Login ID is required' },
        { status: 400 }
      );
    }

    const logins = readLogins();
    const loginToReset = logins.find((login) => login.id === loginId);

    if (!loginToReset) {
      return NextResponse.json(
        { error: 'Login not found' },
        { status: 404 }
      );
    }

    loginToReset.assigned = false;
    loginToReset.assignedTo = null;

    writeLogins(logins);

    return NextResponse.json({
      success: true,
      message: 'Login reset successfully',
    });
  } catch (error) {
    console.error('Error resetting login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
