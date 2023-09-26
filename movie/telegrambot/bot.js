const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' and 'YOUR_TMDB_API_KEY' with your actual bot token and TMDb API key
// const botToken = process.env.REACT_APP_TELEGRAM_KEY;
const botToken = "6594013738:AAHA0VByzhApxzYTKiUPPpr0epH9lLGoQ5Y";
const tmdbApiKey = "680074d35615316e10163f37e95daaae";

const bot = new TelegramBot(botToken, { polling: true });

const tmdbApiEndpoint = "https://api.themoviedb.org/3/search/movie";

async function fetchMovies(title) {
  const queryParams = new URLSearchParams({
    query: title,
    api_key: tmdbApiKey,
  });

  const url = `${tmdbApiEndpoint}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("TMDb API request failed");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies from TMDb:", error);
    throw error;
  }
}

function formatMovieInfo(movie) {
  return `
*Title:* ${movie.title}\n
*Overview:* ${movie.overview}\n
*Release Date:* ${movie.release_date}\n
*Vote Average:* ${movie.vote_average}\n
    `;
}
const helpMessage = `
Welcome to the NewMoviesbot! Here are the available commands:

/info [movie title] - Get information about a movie.
/search [movie title] - Search for movies.
/download [movie title] - Get a download link for a movie.
/help - Show this help message.

For example, you can use /info [movie title] to get details about a specific movie.
`;

bot.onText(/\/start|\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown" });
});

bot.onText(/\/info (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const movieTitle = match[1];

  try {
    const movies = await fetchMovies(movieTitle);

    if (movies.length > 0) {
      const movie = movies[0];
      const formattedInfo = formatMovieInfo(movie);
      bot.sendMessage(chatId, formattedInfo, { parse_mode: "Markdown" });
    } else {
      bot.sendMessage(chatId, `No movie found with the title '${movieTitle}'.`);
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "An error occurred while fetching movie information from TMDb."
    );
  }
});

bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const searchTitle = match[1];

  try {
    const movies = await fetchMovies(searchTitle);

    if (movies.length > 0) {
      const response = movies
        .map((movie) => {
          return `
          Title: ${movie.title}
          Release Date: ${movie.release_date}
        `;
        })
        .join("\n\n");

      bot.sendMessage(chatId, `Matching Movies:\n\n${response}`);
    } else {
      bot.sendMessage(chatId, `No movies found matching '${searchTitle}'.`);
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "An error occurred while fetching movie information from TMDb."
    );
  }
});
bot.onText(/\/download (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const movieTitle = match[1];

  try {
    const movies = await fetchMovies(movieTitle);

    if (movies.length > 0) {
      const movie = movies[0]; // Assuming you want info for the first matching movie
      const movieId = movie.id;
      const downloadLink = `https://movies-star.vercel.app/player/${movieId}/${encodeURIComponent(
        movie.title
      )}`;

      bot.sendMessage(chatId, `Download Link: ${downloadLink}`);
    } else {
      bot.sendMessage(chatId, `No movie found with the title '${movieTitle}'.`);
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "An error occurred while fetching movie information."
    );
  }
});

console.log("Bot is running...");
