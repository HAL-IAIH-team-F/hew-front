import {ReactNode} from "react";
import {Random} from "@/app/_util/random";

let id = 0;

export abstract class Block {
  readonly abstract height: number;
  readonly abstract width: number;
  readonly abstract padTop: number;
  readonly abstract padDown: number;
  readonly abstract padLeft: number;
  readonly abstract padRight: number;
  readonly id: number;

  abstract node(top: number, left: number): ReactNode;

  constructor() {
    id++;
    this.id = id;
  }

  static readonly blocks: (() => Block)[] = [
    () => new Sample(),
  ] as const;

  static randomBlock(): Block {
    return Random.randomItem(this.blocks)();
  }
}

class Sample extends Block {
  height = 800;
  width = 800;
  padTop = 0;
  padDown = 0;
  padLeft = 0;
  padRight = 0;

  node(top: number, left: number): ReactNode {
    return <div
      key={this.id} className={"absolute h-[600px] w-[800px] bg-white shadow box-border border-2 border-amber-950 bg-wood-pattern"}
      style={{
        left,
        top,
      }}
    >
    <App/>
    </div>;
  }
}

import React from 'react';
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
}

interface BookProps extends Omit<Book, 'id'> {}

const Book: React.FC<BookProps> = ({ title, author, imageUrl }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/*<img src={imageUrl} alt={title} className="w-full h-48 object-cover" />*/}
      <Image

          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          width={100}
          height={24}
          priority
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700">{author}</p>
      </div>
    </div>
);

interface BookshelfProps {
    books: Book[];
}

const Bookshelf: React.FC<BookshelfProps> = ({ books }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
          <Book key={book.id} {...book} />
      ))}
    </div>
);

const books: Book[] = [
  { id: 1, title: "React入門", author: "John Doe", imageUrl: "/1.jpg" },
  { id: 2, title: "Tailwind CSS マスター", author: "Jane Smith", imageUrl: "/1.jpg" },
    { id: 3, title: "Tailwind CSS マスター", author: "Jane Smith", imageUrl: "/1.jpg" },

  // 他の本のデータをここに追加...
];



const App: React.FC = () => {
    const books = [
        { id: 1, title: "React入門", author: "John Doe", imageUrl: "/3.jpg" },
        { id: 1, title: "React入門", author: "John Doe", imageUrl: "/3.jpg" },
        { id: 1, title: "React入門", author: "John Doe", imageUrl: "/3.jpg" },
        // 他の本を追加
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center my-8">My Bookshelf</h1>

            {/* 本棚の外枠 */}
            <div className=" p-8 rounded-lg shadow-xl">
                {/* 棚を表現 */}
                <div className="bg-brown-500 h-4 mb-6 rounded"></div>

                {/* Bookshelf component */}
                {/* もう1段の棚 */}
                <Bookshelf books={books}/>
            </div>
        </div>
    );
};


