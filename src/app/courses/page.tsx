'use client';

import { useState } from 'react';
import Image from 'next/image';
import { courses, subjects } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Modal, Select, Avatar } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function CoursesPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = (language === 'bn' ? course.titleBn : course.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: t('courses.allCourses') },
    { value: 'hsc', label: t('courses.hsc') },
    { value: 'ssc', label: t('courses.ssc') },
    { value: 'admission', label: t('courses.admission') },
    { value: 'job', label: t('courses.job') },
    { value: 'skill', label: t('courses.skill') },
    { value: 'language', label: t('courses.language') },
  ];

  const categoryOptions = [
    { value: 'hsc', label: t('courses.hsc') },
    { value: 'ssc', label: t('courses.ssc') },
    { value: 'admission', label: t('courses.admission') },
    { value: 'job', label: t('courses.job') },
    { value: 'skill', label: t('courses.skill') },
    { value: 'language', label: t('courses.language') },
  ];

  const getCategoryLabel = (category: string) => {
    return t(`courses.${category}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('courses.title')}</h1>
          <p className="text-muted-foreground">{t('courses.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('courses.newCourse')}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalCourses')}</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('courses.published')}</p>
            <p className="text-2xl font-bold">{courses.filter(c => c.isPublished).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('courses.students')}</p>
            <p className="text-2xl font-bold">{courses.reduce((acc, c) => acc + c.enrolledStudents, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('courses.featured')}</p>
            <p className="text-2xl font-bold">{courses.filter(c => c.isFeatured).length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
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
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${selectedCategory === cat.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="relative aspect-video">
              {course.thumbnail && (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant={course.isPublished ? 'success' : 'secondary'}>
                  {course.isPublished ? t('courses.published') : t('courses.draft')}
                </Badge>
                {course.isFeatured && (
                  <Badge variant="default">{t('courses.featured')}</Badge>
                )}
              </div>
              {course.discount && (
                <div className="absolute top-3 right-3">
                  <Badge variant="destructive">{course.discount}% {t('courses.discount')}</Badge>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Badge variant="outline" className="text-xs">
                  {getCategoryLabel(course.category)}
                </Badge>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2 mt-2">{language === 'bn' ? course.titleBn : course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                {course.teacher && (
                  <>
                    <Avatar src={course.teacher.avatar} fallback={course.teacher.name.charAt(0)} size="sm" />
                    <span className="text-sm text-muted-foreground">{course.teacher.name}</span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('courses.students')}</p>
                  <p className="font-medium">{course.enrolledStudents}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('courses.totalClasses')}</p>
                  <p className="font-medium">{course.completedClasses}/{course.totalClasses}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('courses.price')}</p>
                  <p className="font-medium text-primary">
                    {course.discount ? (
                      <span>
                        ৳{course.price - (course.price * course.discount / 100)}
                        <span className="ml-1 text-muted-foreground line-through text-xs">৳{course.price}</span>
                      </span>
                    ) : (
                      `৳${course.price}`
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('courses.language')}</p>
                  <p className="font-medium">{course.language === 'bn' ? 'বাংলা' : 'English'}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  {t('common.edit')}
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  {t('common.details')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('courses.newCourse')}>
        <form className="space-y-4">
          <Input label={t('courseName') + ' (বাংলা)'} placeholder={t('courseName')} />
          <Input label={t('courseName') + ' (English)'} placeholder="Course name" />
          <Select label={t('category')} options={categoryOptions} />
          <Select label={t('subject')} options={subjects.map(s => ({ value: s.id, label: language === 'bn' ? s.nameBn : s.name }))} />
          <Input label={t('courses.price') + ' (৳)'} type="number" placeholder="0" />
          <Input label={t('courses.discount') + ' (%)'} type="number" placeholder="0" />
          <Input label="Course Link" placeholder="https://..." />
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
