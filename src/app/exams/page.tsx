'use client';

import { useState } from 'react';
import { exams, courses } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Modal, Input, Select } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function ExamsPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredExams = exams.filter(exam => {
    return selectedStatus === 'all' || exam.status === selectedStatus;
  });

  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'upcoming', label: t('common.upcoming') },
    { value: 'ongoing', label: t('batches.ongoing') },
    { value: 'completed', label: t('common.completed') },
    { value: 'published', label: language === 'bn' ? 'প্রকাশিত' : 'Published' },
  ];

  const examTypeOptions = [
    { value: 'mcq', label: t('mcq') },
    { value: 'written', label: t('written') },
    { value: 'practical', label: t('practical') },
    { value: 'mixed', label: t('mixed') },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="warning">{t('common.upcoming')}</Badge>;
      case 'ongoing':
        return <Badge variant="secondary">{t('batches.ongoing')}</Badge>;
      case 'completed':
        return <Badge variant="secondary">{t('common.completed')}</Badge>;
      case 'published':
        return <Badge variant="success">{language === 'bn' ? 'প্রকাশিত' : 'Published'}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('exams.title')}</h1>
          <p className="text-muted-foreground">{t('exams.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('exams.newExam')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.all')}</p>
            <p className="text-2xl font-bold">{exams.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.upcoming')}</p>
            <p className="text-2xl font-bold text-amber-600">{exams.filter(e => e.status === 'upcoming').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('batches.ongoing')}</p>
            <p className="text-2xl font-bold text-blue-600">{exams.filter(e => e.status === 'ongoing').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.completed')}</p>
            <p className="text-2xl font-bold text-emerald-600">{exams.filter(e => e.status === 'completed').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedStatus === status.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exams Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                {getStatusBadge(exam.status)}
              </div>
              {exam.course && (
                <p className="text-sm text-muted-foreground">{language === 'bn' ? exam.course.titleBn : exam.course.title}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Exam Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-muted-foreground">{t('examType')}:</span>
                    <Badge variant="outline" className="text-xs">
                      {exam.type === 'mcq' ? t('mcq') :
                       exam.type === 'written' ? t('written') :
                       exam.type === 'practical' ? t('practical') : t('mixed')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{exam.duration} {t('minutes')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('totalMarks')}</p>
                    <p className="font-medium">{exam.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('passingMarks')}</p>
                    <p className="font-medium">{exam.passingMarks}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('startDate')}</p>
                    <p className="font-medium">{new Date(exam.scheduledAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('endDate')}</p>
                    <p className="font-medium">{new Date(exam.endedAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('common.edit')}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('questions')}
                  </Button>
                  <Button size="sm" className="flex-1">
                    {exam.status === 'upcoming' ? t('startExam') : t('result')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Exam Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('exams.newExam')}>
        <form className="space-y-4">
          <Input label={t('courseName')} placeholder={language === 'bn' ? 'যেমন: Physics Chapter 1-3 Test' : 'e.g., Physics Chapter 1-3 Test'} />
          <Select 
            label={t('courses.title')} 
            options={courses.map(c => ({ value: c.id, label: language === 'bn' ? c.titleBn : c.title }))}
          />
          <Select 
            label={t('batches.title')} 
            options={[{ value: '', label: t('common.all') }]}
          />
          <Select label={t('examType')} options={examTypeOptions} />
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('totalMarks')} type="number" placeholder="100" />
            <Input label={t('passingMarks')} type="number" placeholder="40" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('duration')} type="number" placeholder="60" />
            <Input label={t('questions')} type="number" placeholder="50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('startDate')} type="datetime-local" />
            <Input label={t('endDate')} type="datetime-local" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {t('common.create')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
