'use server';
import { NextResponse } from 'next/server';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';

//----------------------------------------------------------------
// this endpoint is used to get all the streaks for a user by id.
//----------------------------------------------------------------
export async function GET(req: Request) {
  try {
    const neon = new Pool({
      connectionString: process.env.POSTGRES_PRISMA_URL,
    });
    const adapter = new PrismaNeon(neon);
    const prisma = new PrismaClient({ adapter });
    // get the url from the fetch request
    const url = new URL(req.url);

    // get the skip parameter to increment the page number
    const skip = parseInt(url.searchParams.get('skip') || '0', 10);

    const userId = '1';
    if (!userId) {
      return NextResponse.json({ error: 'User not found' });
    }
    const streaks = await prisma.streaks.findMany({
      where: {
        id: userId,
      },
      orderBy: {
        created: 'desc',
      },
      take: 5,
      skip: skip,
    });
    return NextResponse.json(streaks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error getting streaks' });
  }
}
//----------------------------------------------------------------
//----------------------------------------------------------------
// Fetch streaks initially and when skip changes
// useEffect(() => {
//   const fetchStreaks = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/api/streaks?skip=${skip}`);
//       const newStreaks = await response.json();
// Append new streaks to the existing list
//       setStreaks((prev) => [...prev, ...newStreaks]);
//     } catch (error) {
//       console.error('Error fetching streaks:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchStreaks();
// }, [skip]);

// Function to load more streaks
// const handleLoadMore = () => {
//   setSkip((prevSkip) => prevSkip + 5);
// };
