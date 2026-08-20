export interface IMovieSeedItem {
	title: string;
	slug: string;
	description: string;
	poster: string;
	banner: string;
	duration: number;
	releaseDate: Date | null;
	releaseYear: number;
	ratingAge: number;
	country: string;
	categorySlug: string;
}
