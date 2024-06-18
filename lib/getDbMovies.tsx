// lib/comedyMovies.ts
import { connectToDatabase } from './mongodb';
import { dbMovie } from "@/typings";

export async function getMoviesByGenre( genreID : String) {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('movies');

    const count = await collection.countDocuments();
    console.log('Total movies in collection:', count);

    let movies = await collection
      .find({ genre_ids: { $regex: genreID } })
      .sort({ popularity: -1 })
      .limit(20)
      .toArray();

    console.log('Fetched movies');

    if (!movies.length) {
      return { message: 'No movies found' };
    }

    // Function to remove Arabic words using regex
    const removeArabicWords = (title: string): string => {
      const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g;
      return title.replace(arabicRegex, '').trim();
    };

    // Remove duplicates based on the title field after removing Arabic words
    const uniqueMovies : dbMovie[] = [];
    const titles = new Set();
    for (const movie of movies) {
      const cleanedTitle = removeArabicWords(movie.title);
      if (!titles.has(cleanedTitle)) {
        uniqueMovies.push(movie);
        titles.add(cleanedTitle);
      }
    }

    return { data: uniqueMovies };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { error: 'Failed to fetch movies' };
  }
}
export async function getTopRatedMoviesDb() {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('movies');

    const count = await collection.countDocuments();
    console.log('Total movies in collection:', count);

    let movies = await collection
      .find({ poster_path: { $ne: null, $nin: [""] } })
      .sort({ popularity: -1 })
      .skip(100)
      .limit(20)
      .toArray();

    if (!movies.length) {
      return { message: 'No movies found' };
    }

    // Function to remove Arabic words using regex
    const removeArabicWords = (title: string): string => {
      const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g;
      return title.replace(arabicRegex, '').trim();
    };

    // Remove duplicates based on the title field after removing Arabic words
    const uniqueMovies : dbMovie[] = [];
    const titles = new Set();
    for (const movie of movies) {
      const cleanedTitle = removeArabicWords(movie.title);
      if (!titles.has(cleanedTitle)) {
        uniqueMovies.push(movie);
        titles.add(cleanedTitle);
      }
    }

    return { data: uniqueMovies };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { error: 'Failed to fetch movies' };
  }
}

export async function searchMovies(searchTerm: string) {
  try {
    const { db } = await connectToDatabase();

    const collection = db.collection('movies');

    const count = await collection.countDocuments();
    console.log('Total movies in collection:', count);

    // Perform a case-insensitive search using a regex
    const movies = await collection
      .find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { overview: { $regex: searchTerm, $options: 'i' } },
        ]
      })
      .limit(50)
      .toArray();

    if (!movies.length) {
      return { message: 'No movies found' };
    }

    return { data: movies };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { message: 'Error fetching movies' };
  }
}

export async function searchMoviesByGenre(genreID: string, page: number = 1, limit: number = 21) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('movies');

    const count = await collection.countDocuments({ genre_ids: { $regex: genreID } });
    console.log('Total movies in collection:', count);

    const skip = (page - 1) * limit;

    let movies = await collection
      .find({ genre_ids: { $regex: genreID } })
      .sort({ popularity: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    if (!movies.length) {
      return { message: 'No movies found' };
    }

    // Function to remove Arabic words using regex
    const removeMochahadaWord = (title: string): string => {
      const specificWord = "مشاهدة";
      let cleanedTitle = title.replace(new RegExp(specificWord, 'g'), '').trim();
      return cleanedTitle;
    };

    // Remove duplicates based on the title field after removing Arabic words
    const uniqueMovies: dbMovie[] = [];
    for (const movie of movies) {
      const cleanedTitle = removeMochahadaWord(movie.title);
      movie.title = cleanedTitle;
      uniqueMovies.push(movie);
    }

    return {
      data: uniqueMovies,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalMovies: count
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { error: 'Failed to fetch movies' };
  }
}

export async function GetMovieWithId (id : any) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('movies');

    let movie = await collection
      .findOne({ id: parseInt(id)  })

    if (!movie) {
      return { message: 'No movies found' };
    }
    
    return { data : movie }

  } catch (error) {
    console.error('Error fetching movies:', error);
    return { error: 'Failed to fetch movies' };
  }
}
