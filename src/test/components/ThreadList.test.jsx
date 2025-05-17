/* eslint-disable no-undef */
import React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import ThreadsList from '../../components/ThreadsList';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
const mockNavigate = jest.fn();
const mockThreads = [
  {
    id: 'thread-1',
    title: 'Halo gais',
    body: 'gais123',
    category: 'redux',
    createdAt: '2025-05-11T10:16:51.758Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
    owner: {
      id: 'user-1',
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      avatar: 'https://avatar.url/image.jpg',
    },
    authUser: 'user-TG9rOZN4V6maJ7gl',
  },
  {
    id: 'thread-2',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-2',
    totalComments: 5,
    upVotesBy: ['user-2'],
    downVotesBy: [],
    owner: {
      id: 'user-2',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://avatar.url/image.jpg',
    },
    authUser: 'user-TG9rOZN4V6maJ7gl',
  },
  {
    id: 'thread-3',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
    category: 'perkenalan',
    createdAt: '2023-05-29T07:54:35.746Z',
    ownerId: 'user-aROWej8yYA1sOfHN',
    totalComments: 1,
    upVotesBy: ['user-4'],
    downVotesBy: [],
    owner: {
      id: 'user-aROWej8yYA1sOfHN',
      name: 'Dicoding',
      email: 'admin@dicoding.com',
      avatar: 'https://avatar.url/image.jpg',
    },
    authUser: 'user-3',
  },
];

describe('ThreadsList component', () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  const mockUpVote = jest.fn();
  const mockDownVote = jest.fn();
  const mockNeutralizeVote = jest.fn();

  it('should render all threads initially', () => {
    render(
      <ThreadsList
        threads={mockThreads}
        upVoteThread={mockUpVote}
        downVoteThread={mockDownVote}
        neutralizeVoteThread={mockNeutralizeVote}
      />
    );

    expect(screen.getByText(/Halo gais/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Bagaimana pengalamanmu belajar Redux?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Halo! Selamat datang dan silakan perkenalkan diri kamu/i
      )
    ).toBeInTheDocument();
  });

  it('should filter threads when a category badge is clicked', () => {
    render(
      <ThreadsList
        threads={mockThreads}
        upVoteThread={mockUpVote}
        downVoteThread={mockDownVote}
        neutralizeVoteThread={mockNeutralizeVote}
      />
    );

    const reactBadge = screen.getAllByText('#redux');
    fireEvent.click(reactBadge[0]);
    expect(screen.getByText(/Halo gais/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Bagaimana pengalamanmu belajar Redux?/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Halo! Selamat datang dan silakan perkenalkan diri kamu/i
      )
    ).not.toBeInTheDocument();
  });
});
