import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const logins = readLogins();

    const stats = {
      total: logins.length,
      assigned: logins.filter(l => l.assigned).length,
      available: logins.filter(l => !l.assigned).length,
    };

    return NextResponse.json({
      logins: logins.map(login => ({
        id: login.id,
        url: login.url,
        username: login.username,
        password: login.password,
        assigned: login.assigned,
        assignedTo: login.assignedTo,
      })),
      stats,
    });
  } catch (error) {
    console.error('Error reading logins:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
