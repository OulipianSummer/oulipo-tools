import axios from 'axios';

// Define a closure to create and manage the cache
const createThesaurusCache = () => {
    const cache:Record<string,any>= {}; // This will store cached responses

    // The actual cache function
    const cacheEntry = (word:string, data:Record<string,any>) => {
        cache[word] = data;
    };

    // The function to check if a word is in the cache
    const getCachedEntry = (word:string) => {
        return cache[word];
    };

    return { cacheEntry, getCachedEntry };
};

// Create an instance of the cache
const thesaurusCache = createThesaurusCache();

export default function getThesaurusEntry(word: string) {
    // Check if the word is in the cache
    const cachedData = thesaurusCache.getCachedEntry(word);
    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    const apiKey = process.env.THESAURUS_API_KEY;
    const apiUrl = `https://api.api-ninjas.com/v1/thesaurus?word=${word}`;
    const headers = { 'X-Api-Key': apiKey };

    return axios.get(apiUrl, { headers })
        .then(response => {
            const data = response.data;
            // Cache the response for future use
            thesaurusCache.cacheEntry(word, data);
            return data;
        })
        .catch(error => {
            throw new Error(`Error fetching thesaurus data: ${error.message}`);
        });
}