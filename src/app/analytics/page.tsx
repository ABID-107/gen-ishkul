'use client';

import { analyticsData, activities } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function AnalyticsPage() {
  const { t, language } = useLanguage();
  const { revenueByMonth, studentEnrollmentByCategory, attendanceRate, examPerformance, topCourses } = analyticsData;

  const maxRevenue = Math.max(...revenueByMonth.map(r => r.amount));
  const maxEnrollment = Math.max(...studentEnrollmentByCategory.map(s => s.count));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('analytics.title')}</h1>
          <p className="text-muted-foreground">{t('analytics.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{t('analytics.thisMonth')}</Badge>
          <Badge variant="default">{t('analytics.thisYear')}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('analytics.monthlyRevenue')}</p>
                <p className="mt-2 text-3xl font-bold">৳{analyticsData.revenueByMonth.reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+12.5% from last year</p>
              </div>
              <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('analytics.attendanceRate')}</p>
                <p className="mt-2 text-3xl font-bold">{attendanceRate}%</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+2.3% from last month</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('analytics.avgScore')}</p>
                <p className="mt-2 text-3xl font-bold">{Math.round(examPerformance.reduce((a, b) => a + b.avgScore, 0) / examPerformance.length)}%</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+5% from last term</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('analytics.passRate')}</p>
                <p className="mt-2 text-3xl font-bold">{Math.round(examPerformance.reduce((a, b) => a + b.passRate, 0) / examPerformance.length)}%</p>
                <p className="mt-1 text-xs font-medium text-emerald-600">+3% from last term</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.monthlyRevenue')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByMonth.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-10 text-sm font-medium">{month.month}</div>
                  <div className="flex-1">
                    <div className="h-8 w-full rounded-lg bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-lg gradient-primary transition-all duration-500"
                        style={{ width: `${(month.amount / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-24 text-right text-sm font-medium">
                    ৳{month.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.enrollmentByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentEnrollmentByCategory.map((item, index) => {
                const colors = [
                  'bg-primary',
                  'bg-emerald-500',
                  'bg-amber-500',
                  'bg-purple-500',
                  'bg-blue-500',
                  'bg-pink-500',
                ];
                return (
                  <div key={item.category} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">{item.category}</div>
                    <div className="flex-1">
                      <div className="h-8 w-full rounded-lg bg-muted overflow-hidden">
                        <div 
                          className={`h-full rounded-lg ${colors[index]} transition-all duration-500`}
                          style={{ width: `${(item.count / maxEnrollment) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">
                      {item.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.examTrend')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {examPerformance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('analytics.term')} {index + 1}</span>
                    <span className="font-medium">{t('analytics.avgScoreShort')}: {item.avgScore}% | {t('analytics.passRateShort')}: {item.passRate}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${item.avgScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${item.passRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                {t('analytics.avgScore')}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                {t('analytics.passRate')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.topCourses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {index + 1}
                  </div>
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-12 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{language === 'bn' ? course.titleBn : course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.enrolledStudents} {t('courses.students')}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentActivities')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-3">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {activity.type === 'certificate' && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.userName}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">
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
    </div>
  );
}
