// Book Interface
interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    isAvailable: boolean;
    id: number;
    rating: number;
    reviews: IReview[];
}

// Review Interface
interface IReview {
    reviewer: string;
    comment: string;
    rating: number;
}

// User Interface
interface IUser {
    username: string;
    password: string;
    borrowedBooks: IBook[];
}

// Library Class to manage books and users
class Library {
    private books: IBook[] = [];
    private users: IUser[] = [];
    private nextBookId: number = 1;
    private nextUserId: number = 1;

    // Add a new book
    addBook(book: IBook): IBook {
        book.id = this.nextBookId++;
        this.books.push(book);
        console.log(`Book "${book.title}" added to the library.`);
        return book;
    }

    // Add a new user
    addUser(username: string, password: string): IUser {
        const user: IUser = {
            username,
            password,
            borrowedBooks: [],
        };
        this.users.push(user);
        console.log(`User "${username}" added to the library.`);
        return user;
    }

    // Find a book by title
    findBookByTitle(title: string): IBook | undefined {
        return this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
    }

    // Find books by genre
    findBooksByGenre(genre: string): IBook[] {
        return this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    }

    // Add a review to a book
    addReview(bookId: number, reviewer: string, comment: string, rating: number): string {
        const book = this.books.find(b => b.id === bookId);
        if (!book) {
            return "Book not found.";
        }
        const review: IReview = {
            reviewer,
            comment,
            rating,
        };
        book.reviews.push(review);
        book.rating = this.calculateAverageRating(book.reviews);
        return `Review added to book "${book.title}".`;
    }

    // Calculate average rating for a book
    private calculateAverageRating(reviews: IReview[]): number {
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length;
    }

    // Borrow a book
    borrowBook(username: string, bookId: number): string {
        const book = this.books.find(b => b.id === bookId);
        const user = this.users.find(u => u.username === username);
        if (!book) {
            return "Book not found.";
        }
        if (!user) {
            return "User not found.";
        }
        if (!book.isAvailable) {
            return "Sorry, this book is currently unavailable.";
        }
        book.isAvailable = false;
        user.borrowedBooks.push(book);
        return `User "${username}" borrowed "${book.title}".`;
    }

    // Return a borrowed book
    returnBook(username: string, bookId: number): string {
        const book = this.books.find(b => b.id === bookId);
        const user = this.users.find(u => u.username === username);
        if (!book) {
            return "Book not found.";
        }
        if (!user) {
            return "User not found.";
        }
        const bookIndex = user.borrowedBooks.findIndex(b => b.id === bookId);
        if (bookIndex === -1) {
            return `"${username}" has not borrowed "${book.title}".`;
        }
        user.borrowedBooks.splice(bookIndex, 1);
        book.isAvailable = true;
        return `"${username}" returned "${book.title}".`;
    }

    // Remove a book from the library
    removeBook(id: number): string {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1) {
            return "Book not found.";
        }
        const book = this.books.splice(index, 1);
        return `Book "${book[0].title}" removed from the library.`;
    }

    // List all books in the library (borrowed or available)
    listAllBooks(): IBook[] {
        return this.books;
    }

    // Get statistics of the library
    getLibraryStatistics(): string {
        const availableCount = this.books.filter(b => b.isAvailable).length;
        const borrowedCount = this.books.length - availableCount;
        return `Total books: ${this.books.length}, Available books: ${availableCount}, Borrowed books: ${borrowedCount}`;
    }

    // Get user information
    getUserInfo(username: string): IUser | string {
        const user = this.users.find(u => u.username === username);
        if (!user) {
            return "User not found.";
        }
        return user;
    }

    // List available books
    listAvailableBooks(): IBook[] {
        return this.books.filter(book => book.isAvailable);
    }

    // Find books by author
    findBooksByAuthor(author: string): IBook[] {
        return this.books.filter(book => book.author.toLowerCase() === author.toLowerCase());
    }
}

// Simulate Async Operations (e.g., fetching from a database)
const fetchBookFromDatabase = async (id: number): Promise<IBook | null> => {
    const bookDatabase: IBook[] = [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publicationYear: 1925, isAvailable: true, id: 1, rating: 4.5, reviews: [] },
        { title: "1984", author: "George Orwell", genre: "Dystopian", publicationYear: 1949, isAvailable: true, id: 2, rating: 4.8, reviews: [] },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publicationYear: 1960, isAvailable: true, id: 3, rating: 4.3, reviews: [] },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", publicationYear: 1951, isAvailable: false, id: 4, rating: 4.0, reviews: [] }
    ];
    const book = bookDatabase.find(book => book.id === id);
    return new Promise(resolve => setTimeout(() => resolve(book || null), 1000)); // Simulating async call delay
};

// Main library usage with async/await
const main = async () => {
    const myLibrary = new Library();

    // Add some books to the library
    myLibrary.addBook({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", publicationYear: 1925, isAvailable: true, id: 0, rating: 0, reviews: [] });
    myLibrary.addBook({ title: "1984", author: "George Orwell", genre: "Dystopian", publicationYear: 1949, isAvailable: true, id: 0, rating: 0, reviews: [] });
    myLibrary.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publicationYear: 1960, isAvailable: true, id: 0, rating: 0, reviews: [] });
    myLibrary.addBook({ title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", publicationYear: 1951, isAvailable: false, id: 0, rating: 0, reviews: [] });

    // Add users to the system
    myLibrary.addUser("Evan", "password123");
    myLibrary.addUser("Sarah", "password456");

    // Borrow a book
    console.log(myLibrary.borrowBook("Evan", 1)); // Borrow "The Great Gatsby"

    // Add a review
    console.log(myLibrary.addReview(1, "Evan", "An amazing book!", 5));

    // Get library statistics
    console.log(myLibrary.getLibraryStatistics());

    // List available books
    console.log("Available books:", myLibrary.listAvailableBooks());

    // List books by genre
    console.log("Fiction books:", myLibrary.findBooksByGenre("Fiction"));

    // Return a borrowed book
    console.log(myLibrary.returnBook("Evan", 1)); // Return "The Great Gatsby"

    // Fetch a book from the database (simulating async fetch)
    const bookFromDb = await fetchBookFromDatabase(3);
    if (bookFromDb) {
        console.log("Fetched book from DB:", bookFromDb);
    } else {
        console.log("Book not found in database.");
    }

    // Get user info
    console.log("User info:", myLibrary.getUserInfo("Evan"));

    // Remove a book from the library
    console.log(myLibrary.removeBook(2)); // Remove "1984"

    // Get updated library statistics
    console.log(myLibrary.getLibraryStatistics());
};

// Run the main function
main();
