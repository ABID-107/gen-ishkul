'use client';

import { useState } from 'react';
import { batches, courses, teachers } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Avatar, Modal, Input, Select } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function BatchesPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredBatches = batches.filter(batch => {
    return selectedStatus === 'all' || batch.status === selectedStatus;
  });

  const statusOptions = [
    { value: 'all', label: t('batches.allBatches') },
    { value: 'ongoing', label: t('batches.ongoing') },
    { value: 'upcoming', label: t('common.upcoming') },
    { value: 'completed', label: t('common.completed') },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <Badge variant="success">{t('batches.ongoing')}</Badge>;
      case 'upcoming':
        return <Badge variant="warning">{t('common.upcoming')}</Badge>;
      case 'completed':
        return <Badge variant="secondary">{t('common.completed')}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">{t('common.cancel')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('batches.title')}</h1>
          <p className="text-muted-foreground">{t('batches.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('batches.newBatch')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('batches.allBatches')}</p>
            <p className="text-2xl font-bold">{batches.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('batches.ongoing')}</p>
            <p className="text-2xl font-bold text-emerald-600">{batches.filter(b => b.status === 'ongoing').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.upcoming')}</p>
            <p className="text-2xl font-bold text-amber-600">{batches.filter(b => b.status === 'upcoming').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('students.title')}</p>
            <p className="text-2xl font-bold">{batches.reduce((acc, b) => acc + b.currentStudents, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
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

      {/* Batches Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBatches.map((batch) => (
          <Card key={batch.id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{batch.name}</CardTitle>
                {getStatusBadge(batch.status)}
              </div>
              {batch.course && (
                <p className="text-sm text-muted-foreground">{language === 'bn' ? batch.course.titleBn : batch.course.title}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Teacher */}
                {batch.teacher && (
                  <div className="flex items-center gap-3">
                    <Avatar src={batch.teacher.avatar} fallback={batch.teacher.name.charAt(0)} size="sm" />
                    <div>
                      <p className="text-sm font-medium">{batch.teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{batch.teacher.designation}</p>
                    </div>
                  </div>
                )}

                {/* Schedule */}
                <div>
                  <p className="text-sm font-medium mb-2">{t('schedule')}</p>
                  <div className="flex flex-wrap gap-1">
                    {batch.schedule.map((s, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {s.day === 'saturday' ? t('sat') :
                         s.day === 'sunday' ? t('sun') :
                         s.day === 'monday' ? t('mon') :
                         s.day === 'tuesday' ? t('tue') :
                         s.day === 'wednesday' ? t('wed') :
                         s.day === 'thursday' ? t('thu') : t('fri')}
                        {' '}{s.startTime}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('students')}</p>
                    <p className="font-medium">{batch.currentStudents}/{batch.maxStudents}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('room')}</p>
                    <p className="font-medium">{batch.roomNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('startDate')}</p>
                    <p className="font-medium">{new Date(batch.startDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('endDate')}</p>
                    <p className="font-medium">{new Date(batch.endDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}</p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{t('common.status')}</span>
                    <span className="font-medium">{Math.round((batch.currentStudents / batch.maxStudents) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-full rounded-full bg-primary transition-all" 
                      style={{ width: `${(batch.currentStudents / batch.maxStudents) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('common.edit')}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('common.details')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Batch Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('batches.newBatch')}>
        <form className="space-y-4">
          <Input label={t('batchName')} placeholder={language === 'bn' ? 'যেমন: HSC 2026 Science - Alpha' : 'e.g., HSC 2026 Science - Alpha'} />
          <Select 
            label={t('courseName')} 
            options={courses.map(c => ({ value: c.id, label: language === 'bn' ? c.titleBn : c.title }))}
          />
          <Select 
            label={t('teachers.title')} 
            options={teachers.map(t => ({ value: t.id, label: t.name }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('startDate')} type="date" />
            <Input label={t('endDate')} type="date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('maxStudents')} type="number" placeholder="40" />
            <Input label={t('room')} placeholder="101" />
          </div>
          <Input label={language === 'bn' ? 'অনলাইন লিংক' : 'Online Link'} placeholder="https://zoom.edu.bd/..." />
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
