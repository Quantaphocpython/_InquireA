"use client"

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { QuestionStats } from './QuestionStats'

interface QuestionCardProps {
  question: {
    id: string
    title: string
    content: string
    bounty: number
    answers: number
    votes: number
    tags: string[]
    author: string
    createdAt: Date
  }
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="group p-6 transition-all duration-200 hover:bg-accent/40">
      <div className="flex gap-6">
        <QuestionStats 
          votes={question.votes}
          answers={question.answers}
          bounty={question.bounty}
        />

        <div className="flex-1 space-y-4">
          <div>
            <Link 
              href={`/questions/${question.id}`}
              className="block text-xl font-semibold text-foreground/90 hover:text-primary transition-colors duration-200 line-clamp-2"
            >
              {question.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3 group-hover:text-muted-foreground/80 transition-colors duration-200">
              {question.content}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Link key={tag} href={`/questions/tagged/${tag}`}>
                <Badge 
                  variant="secondary" 
                  className="bg-secondary/50 hover:bg-secondary transition-colors duration-200"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <Link 
                href={`/users/${question.author}`} 
                className="hover:text-foreground transition-colors duration-200"
              >
                {question.author}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatDistanceToNow(question.createdAt)} ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}