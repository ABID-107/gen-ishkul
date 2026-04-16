'use client';

import Link from 'next/link';
import { dashboardStats, activities, notices, courses, students } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function DashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/students"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            {t('students.newStudent')}
          </Link>
          <Link 
            href="/courses"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t('courses.newCourse')}
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalStudents')}</p>
                <p className="mt-2 text-3xl font-bold">{dashboardStats.totalStudents.toLocaleString()}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{dashboardStats.monthlyGrowth}% this month</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalTeachers')}</p>
                <p className="mt-2 text-3xl font-bold">{dashboardStats.totalTeachers}</p>
                <p className="mt-1 text-xs text-muted-foreground">48 {t('batches.ongoing')} কোর্সে</p>
              </div>
              <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalCourses')}</p>
                <p className="mt-2 text-3xl font-bold">{dashboardStats.totalCourses}</p>
                <p className="mt-1 text-xs text-muted-foreground">86 {t('courses.published')}</p>
              </div>
              <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalRevenue')}</p>
                <p className="mt-2 text-3xl font-bold">৳{(dashboardStats.totalRevenue / 100000).toFixed(1)}L</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+{dashboardStats.monthlyGrowth}% this month</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.recentActivities')}</CardTitle>
            <Link href="/analytics" className="text-sm font-medium text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className={`rounded-full p-2 ${
                    activity.type === 'enrollment' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    activity.type === 'payment' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    activity.type === 'exam' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    activity.type === 'certificate' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {activity.type === 'enrollment' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    {activity.type === 'payment' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    )}
                    {activity.type === 'exam' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    )}
                    {activity.type === 'certificate' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                    {activity.type === 'assignment' && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.userName}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(activity.timestamp).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { 
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.notices')}</CardTitle>
            <Badge variant={dashboardStats.pendingPayments > 100 ? 'destructive' : 'warning'}>
              {dashboardStats.pendingPayments} {t('common.pending')}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {notices.map((notice) => (
              <div 
                key={notice.id}
                className="rounded-lg border p-4 transition-colors hover:bg-accent/50 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1 ${
                    notice.priority === 'urgent' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    notice.priority === 'high' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{notice.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{notice.content}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant={notice.type === 'exam' ? 'default' : notice.type === 'payment' ? 'destructive' : 'secondary'} className="text-xs">
                        {t(`notice.${notice.type}`)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notice.publishedAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.popularCourses')}</CardTitle>
            <Link href="/courses" className="text-sm font-medium text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="flex items-center gap-4">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-12 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{language === 'bn' ? course.titleBn : course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.enrolledStudents} {t('courses.students')}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dashboard.newStudents')}</CardTitle>
            <Link href="/students" className="text-sm font-medium text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.slice(0, 4).map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <Avatar 
                    src={student.avatar}
                    fallback={student.name.charAt(0)}
                    size="md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class} - {student.group || 'N/A'}</p>
                  </div>
                  <Badge variant={student.status === 'active' ? 'success' : 'secondary'}>
                    {t(`common.${student.status}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.activeBatches')}</p>
                <p className="text-2xl font-bold">{dashboardStats.activeBatches}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.upcomingExams')}</p>
                <p className="text-2xl font-bold">{dashboardStats.upcomingExams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.pendingPayments')}</p>
                <p className="text-2xl font-bold">{dashboardStats.pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
