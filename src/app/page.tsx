'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language';
import { courses, teachers, dashboardStats } from '@/lib/mock-data';
import { LanguageToggle, MobileLanguageToggle } from '@/components/ui';

export default function Home() {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuredCourses = courses.filter(c => c.isFeatured).slice(0, 4);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">ইশকুল</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <Link href="#courses" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('courses')}
            </Link>
            <Link href="#teachers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('teachers')}
            </Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('aboutUs')}
            </Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('contact')}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle variant="compact" showLabel={false} className="hidden sm:inline-flex" />
            
            <Link 
              href="/(auth)/longin" 
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors lg:block"
            >
              {t('login')}
            </Link>
            <Link 
              href="/(auth)/register" 
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t('startFree')}
            </Link>
            
            <button 
              className="rounded-lg p-2 hover:bg-accent lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-background/95 backdrop-blur-lg lg:hidden">
            <div className="space-y-1 p-4">
              <Link 
                href="#courses" 
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('courses')}
              </Link>
              <Link 
                href="#teachers" 
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('teachers')}
              </Link>
              <Link 
                href="#about" 
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('aboutUs')}
              </Link>
              <Link 
                href="#contact" 
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              <div className="my-2 border-t" />
              <MobileLanguageToggle />
              <Link 
                href="/(auth)/longin" 
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('login')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {language === 'bn' ? '৫০০০+ শিক্ষার্থী সফলভাবে কোর্স সম্পন্ন করেছে' : '5000+ Students Successfully Completed Courses'}
              </div>
              
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {language === 'bn' ? 'বাংলাদেশের সেরা' : 'The Best of'}
                <br />
                <span className="gradient-text">{language === 'bn' ? 'অনলাইন শিক্ষা প্ল্যাটফর্ম' : 'Online Education Platform'}</span>
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                {language === 'bn' 
                  ? 'এইচএসসি, এসএসসি, বিশ্ববিদ্যালয় ভর্তি, বিসিএস এবং চাকরি পরীক্ষার জন্য বাংলায় সম্পূর্ণ প্রস্তুতি। দেশের শীর্ষ শিক্ষকদের পাঠে নিজেকে আরও দক্ষ করে তুলুন।'
                  : 'Complete preparation for HSC, SSC, University Admission, BCS and Job Exams in Bengali. Improve your skills with top teachers from the country.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  href="/(auth)/register" 
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  {t('startFree')}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="#courses" 
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-6 font-medium hover:bg-accent transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('viewCourses')}
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold">{dashboardStats.totalStudents.toLocaleString()}+</p>
                  <p className="text-sm text-muted-foreground">{t('students')}</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{dashboardStats.totalTeachers}+</p>
                  <p className="text-sm text-muted-foreground">{t('teachers')}</p>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{dashboardStats.totalCourses}+</p>
                  <p className="text-sm text-muted-foreground">{t('courses')}</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-3xl gradient-primary opacity-10 blur-3xl" />
              <div className="relative animate-scaleIn">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                  alt="Students learning together"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 rounded-2xl border bg-card p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{language === 'bn' ? '৯৫% পাস রেট' : '95% Pass Rate'}</p>
                      <p className="text-xs text-muted-foreground">{language === 'bn' ? 'এইচএসসি ২০২৫' : 'HSC 2025'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {language === 'bn' ? 'কেন ' : 'Why Choose '}<span className="gradient-text">ইশকুল</span>{language === 'bn' ? '?' : '?'}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'আমরা বাংলাদেশের শিক্ষার্থীদের জন্য সর্বোত্তম শিক্ষা অভিজ্ঞতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ'
                : 'We are committed to ensuring the best educational experience for students in Bangladesh'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: language === 'bn' ? 'বাংলায় কোর্স' : 'Courses in Bengali',
                description: language === 'bn' ? 'সব কন্টেন্ট বাংলায়, যা বাংলাদেশের শিক্ষার্থীদের জন্য সহজে বোধগম্য' : 'All content in Bengali, easy to understand for students in Bangladesh'
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: language === 'bn' ? 'অনলাইন + অফলাইন' : 'Online + Offline',
                description: language === 'bn' ? 'লাইভ ক্লাস এবং রেকর্ডেড ভিডিও, যেখানে ইন্টারনেট সংযোগ নেই সেখানেও পড়ুন' : 'Live classes and recorded videos, study even where there is no internet'
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                title: language === 'bn' ? 'মডার্ন টেস্ট' : 'Modern Tests',
                description: language === 'bn' ? 'বোর্ড প্যাটার্ন অনুযায়ী মডেল টেস্ট এবং কুইজের মাধ্যমে প্রস্তুতি নিন' : 'Prepare through model tests and quizzes according to board patterns'
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: language === 'bn' ? 'এক্সপার্ট শিক্ষক' : 'Expert Teachers',
                description: language === 'bn' ? 'দেশের সেরা বিশ্ববিদ্যালয় এবং কোচিং সেন্টারের অভিজ্ঞ শিক্ষক' : 'Experienced teachers from top universities and coaching centers'
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: language === 'bn' ? 'সাশ্রয়ী মূল্য' : 'Affordable Price',
                description: language === 'bn' ? 'সেরা মানের শিক্ষা সবার নাগালের মধ্যে, বিকাশ/নগদে পেমেন্ট' : 'Best quality education within reach of everyone, payment via bKash/Nagad'
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: language === 'bn' ? 'সার্টিফিকেট' : 'Certificate',
                description: language === 'bn' ? 'কোর্স সম্পন্ন করে প্রত্যয়নপত্র পান যা চাকরির বাজারে মূল্যবান' : 'Receive certification upon course completion, valuable in the job market'
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="group rounded-2xl border bg-card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {language === 'bn' ? 'জনপ্রিয় ' : 'Popular '}<span className="gradient-text">{t('courses')}</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {language === 'bn' ? 'আমাদের সেরা কোর্সগুলো দেখুন এবং আজই শুরু করুন' : 'View our best courses and start today'}
              </p>
            </div>
            <Link 
              href="/dashboard"
              className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline md:flex"
            >
              {t('viewAllCourses')}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <Link 
                key={course.id}
                href={`/dashboard`}
                className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                      {course.category.toUpperCase()}
                    </span>
                  </div>
                  {course.discount && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center rounded-full bg-destructive px-2.5 py-0.5 text-xs font-medium text-destructive-foreground">
                        {course.discount}% {language === 'bn' ? 'ছাড়' : 'off'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {language === 'bn' ? course.titleBn : course.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {language === 'bn' ? course.descriptionBn : course.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.reviewCount})</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <span className="text-sm text-muted-foreground">
                      {course.totalClasses} {t('classes')}
                    </span>
                    <div className="flex items-center gap-2">
                      {course.discount ? (
                        <>
                          <span className="text-sm font-medium text-muted-foreground line-through">
                            ৳{course.price}
                          </span>
                          <span className="font-semibold text-primary">
                            ৳{course.price - (course.price * course.discount / 100)}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold">৳{course.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="teachers" className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {language === 'bn' ? 'আমাদের ' : 'Our '}<span className="gradient-text">{language === 'bn' ? 'শিক্ষক মণ্ডলী' : 'Teachers'}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'বাংলাদেশের সেরা বিশ্ববিদ্যালয় এবং কোচিং সেন্টারের অভিজ্ঞ শিক্ষকরা আপনার পড়াশোনায় গাইড হিসেবে কাজ করছেন'
                : 'Experienced teachers from Bangladesh\'s top universities and coaching centers are working as guides for your studies'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teachers.map((teacher) => (
              <div 
                key={teacher.id}
                className="rounded-2xl border bg-card p-6 text-center hover:shadow-lg transition-all"
              >
                <img 
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-background"
                />
                <h3 className="mt-4 font-semibold">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground">{teacher.designation}</p>
                <p className="mt-1 text-xs text-muted-foreground">{teacher.qualification}</p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium">{teacher.rating}</span>
                  <span className="text-xs text-muted-foreground">({teacher.totalStudents} {t('students')})</span>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {teacher.subjects.slice(0, 2).map((subject, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {language === 'bn' ? 'আজই আপনার শিক্ষা যাত্রা শুরু করুন' : 'Start Your Educational Journey Today'}
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                {language === 'bn' 
                  ? 'হাজার হাজার শিক্ষার্থী ইতিমধ্যে আমাদের কোর্সে সফল হয়েছে। এবার আপনার পালা!'
                  : 'Thousands of students have already succeeded in our courses. Now it\'s your turn!'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link 
                  href="/(auth)/register"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 font-medium text-primary hover:bg-white/90 transition-colors"
                >
                  {t('register')} {language === 'bn' ? 'বিনামূল্যে' : 'Free'}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/dashboard"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-white px-6 font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {t('viewDemo')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xl font-bold gradient-text">ইশকুল</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                {language === 'bn' 
                  ? 'বাংলাদেশের সেরা অনলাইন শিক্ষা প্ল্যাটফর্ম। HSC, SSC, University Admission এবং Job Preparation এর জন্য সম্পূর্ণ প্রস্তুতি।'
                  : 'The best online education platform in Bangladesh. Complete preparation for HSC, SSC, University Admission and Job Preparation.'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold">{t('courses')}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'এইচএসসি প্রস্তুতি' : 'HSC Preparation'}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'এসএসসি প্রস্তুতি' : 'SSC Preparation'}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'বিশ্ববিদ্যালয় ভর্তি' : 'University Admission'}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'বিসিএস প্রস্তুতি' : 'BCS Preparation'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">{language === 'bn' ? 'গুরুত্বপূর্ণ লিংক' : 'Important Links'}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">{t('aboutUs')}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'শিক্ষক হন' : 'Become a Teacher'}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{t('privacy')}</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">{t('terms')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">{t('contact')}</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>📧 info@ishkul.edu.bd</li>
                <li>📱 +880 1XXX-XXXXXX</li>
                <li>📍 {language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-accent transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-accent transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-accent transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © ২০২৬ ইশকুল। {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">{t('privacy')}</Link>
              <Link href="#" className="hover:text-foreground transition-colors">{t('terms')}</Link>
              <Link href="#" className="hover:text-foreground transition-colors">{language === 'bn' ? 'কুকি সেটিংস' : 'Cookie Settings'}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
