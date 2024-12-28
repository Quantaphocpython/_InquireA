'use client';

import { Suspense } from 'react';
import QuestionDetailWrapper from '@/components/questions/QuestionDetailWrapper';
import { useGetQuestionById } from '@/lib/hooks/useGetQuestionById';
import { mockAnswers } from '@/lib/data/mock-questions';
import { Loader2 } from 'lucide-react';

export default function QuestionPage({ params }: { params: { id: string } }) {
  // Chuyển đổi id sang bigint
  const questionId = BigInt(params.id);

  // Sử dụng hook để fetch chi tiết câu hỏi
  const { question, error, isLoading } = useGetQuestionById(questionId);

  // Lấy answers mock (sau này sẽ thay bằng hook answers)
  const answers = mockAnswers[params.id as keyof typeof mockAnswers] || [];

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Error Loading Question</h1>
        <p className="text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
    );
  }

  // Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span>Loading question...</span>
        </div>
      </div>
    );
  }

  // Xử lý trường hợp không tìm thấy câu hỏi
  if (!question) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Question not found</h1>
        <p className="text-muted-foreground">
          The question you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  // Render chi tiết câu hỏi
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionDetailWrapper
        question={question}
        // answers={answers}
      />
    </Suspense>
  );
}
