'use client';

import { useGetQuestions } from '@/lib/hooks/useGetQuestions';
import { QuestionCard } from './QuestionCard';
import { formatEther } from 'viem';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuestionsList() {
  const { questions, isLoading, pagination, changePage } = useGetQuestions();
  const { currentPage, totalPages } = pagination;

  console.log(questions);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500 text-lg">
          There are currently no questions available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id.toString()}
          question={{
            id: question.id.toString(),
            title: question.questionText,
            content: question.questionContent,
            bounty: Number(formatEther(question.rewardAmount)),
            answers: 0,
            votes: 0,
            tags: question.category?.split(',') || [],
            author: question.asker,
            createdAt: new Date(Number(question.createdAt) * 1000),
          }}
        />
      ))}

      {/* Phân trang */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const questions = [
  {
    id: '1',
    title: 'How to implement authentication in Next.js 13 with Supabase?',
    content:
      "I'm trying to implement authentication in my Next.js 13 application using Supabase. I've followed the documentation but I'm running into issues with the server components...",
    bounty: 50,
    answers: 3,
    votes: 12,
    tags: ['next.js', 'supabase', 'authentication'],
    author: 'johndoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'Best practices for handling state in React components',
    content:
      "What are the current best practices for managing state in React components? I'm specifically interested in complex forms and data fetching scenarios...",
    bounty: 30,
    answers: 5,
    votes: 8,
    tags: ['react', 'javascript', 'state-management'],
    author: 'janedoe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '3',
    title: 'Understanding TypeScript generics with React',
    content:
      "I'm having trouble understanding how to properly use TypeScript generics with React components. Specifically, I'm trying to create a reusable form component...",
    bounty: 45,
    answers: 2,
    votes: 6,
    tags: ['typescript', 'react', 'generics'],
    author: 'alexsmith',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
];
