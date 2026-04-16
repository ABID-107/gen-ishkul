'use client';

import { useState } from 'react';
import { teachers } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Modal, Input, Select, Avatar } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function TeachersPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = teachers.filter(teacher => {
    return teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('teachers.title')}</h1>
          <p className="text-muted-foreground">{t('teachers.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('teachers.newTeacher')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalTeachers')}</p>
            <p className="text-2xl font-bold">{teachers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.active')}</p>
            <p className="text-2xl font-bold text-emerald-600">{teachers.filter(t => t.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalCourses')}</p>
            <p className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + t.courseIds.length, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalStudents')}</p>
            <p className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + t.totalStudents, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('nav.search')}
              className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Teachers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={teacher.avatar}
                    fallback={teacher.name.charAt(0)}
                    size="lg"
                  />
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{teacher.designation}</p>
                  </div>
                </div>
                <Badge variant={teacher.status === 'active' ? 'success' : 'secondary'}>
                  {teacher.status === 'active' ? t('common.active') : t('common.inactive')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Qualification & Experience */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('qualification')}</p>
                  <p className="font-medium">{teacher.qualification}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('experience')}</p>
                  <p className="font-medium">{teacher.experience} {t('years')}</p>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('subject')}</p>
                <div className="flex flex-wrap gap-2">
                  {teacher.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                <div>
                  <p className="text-xl font-bold">{teacher.courseIds.length}</p>
                  <p className="text-xs text-muted-foreground">{t('courses.title')}</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{teacher.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">{t('students.title')}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">{teacher.rating}</span>
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  {t('common.details')}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {t('common.edit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('teachers.newTeacher')}>
        <form className="space-y-4">
          <Input label={t('studentName')} placeholder={language === 'bn' ? 'শিক্ষকের নাম' : 'Teacher name'} />
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('email')} type="email" placeholder="email@example.com" />
            <Input label={t('phone')} type="tel" placeholder="01XXX-XXXXXX" />
          </div>
          <Select 
            label={t('designation')} 
            options={[
              { value: 'principal', label: language === 'bn' ? 'প্রধান শিক্ষক' : 'Principal' },
              { value: 'senior', label: language === 'bn' ? 'সিনিয়র শিক্ষক' : 'Senior Teacher' },
              { value: 'teacher', label: language === 'bn' ? 'শিক্ষক' : 'Teacher' },
              { value: 'assistant', label: language === 'bn' ? 'সহকারী শিক্ষক' : 'Assistant Teacher' },
            ]}
          />
          <Input label={t('qualification')} placeholder={language === 'bn' ? 'যেমন: এমএসসি, ঢাকা বিশ্ববিদ্যালয়' : 'e.g., MSc, Dhaka University'} />
          <Input label={t('experience')} type="number" placeholder="5" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {t('common.add')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
