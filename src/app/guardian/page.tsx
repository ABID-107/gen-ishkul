'use client';

import { useState } from 'react';
import { guardians, students } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Modal, Input, Select, Avatar } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function GuardianPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuardians = guardians.filter(guardian => {
    return guardian.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           guardian.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           guardian.phone.includes(searchQuery);
  });

  const relationOptions = [
    { value: 'father', label: t('father') },
    { value: 'mother', label: t('mother') },
    { value: 'other', label: t('other') },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('guardian.title')}</h1>
          <p className="text-muted-foreground">{t('guardian.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('guardian.newGuardian')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('guardian.title')}</p>
            <p className="text-2xl font-bold">{guardians.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('father')}</p>
            <p className="text-2xl font-bold">{guardians.filter(g => g.relation === 'father').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('mother')}</p>
            <p className="text-2xl font-bold">{guardians.filter(g => g.relation === 'mother').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalStudents')}</p>
            <p className="text-2xl font-bold">{students.length}</p>
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

      {/* Guardians Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuardians.map((guardian) => (
          <Card key={guardian.id} className="hover:shadow-lg transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar 
                    fallback={guardian.name.charAt(0)}
                    size="lg"
                    className="bg-primary/10 text-primary"
                  />
                  <div>
                    <CardTitle className="text-lg">{guardian.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {guardian.relation === 'father' ? t('father') :
                       guardian.relation === 'mother' ? t('mother') : t('other')}
                    </Badge>
                  </div>
                </div>
                <Badge variant={guardian.status === 'active' ? 'success' : 'secondary'}>
                  {guardian.status === 'active' ? t('common.active') : t('common.inactive')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Occupation & Income */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t('occupation')}</p>
                  <p className="font-medium">{guardian.occupation}</p>
                </div>
                {guardian.monthlyIncome !== undefined && (
                  <div>
                    <p className="text-muted-foreground">{t('monthlyIncome')}</p>
                    <p className="font-medium">
                      {guardian.monthlyIncome > 0 
                        ? `৳${guardian.monthlyIncome.toLocaleString()}`
                        : 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {/* Children */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('children')} ({guardian.studentIds.length})</p>
                <div className="space-y-2">
                  {guardian.studentIds.map((studentId) => {
                    const student = students.find(s => s.id === studentId);
                    return student ? (
                      <div key={studentId} className="flex items-center gap-2 rounded-lg border p-2">
                        <Avatar 
                          src={student.avatar}
                          fallback={student.name.charAt(0)}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Contact */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{guardian.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{guardian.phone}</span>
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

      {/* Add Guardian Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('guardian.newGuardian')}>
        <form className="space-y-4">
          <Input label={t('studentName')} placeholder={language === 'bn' ? 'অভিভাবকের নাম' : 'Guardian name'} />
          <Select label={t('relation')} options={relationOptions} />
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('email')} type="email" placeholder="email@example.com" />
            <Input label={t('phone')} type="tel" placeholder="01XXX-XXXXXX" />
          </div>
          <Input label={t('occupation')} placeholder={language === 'bn' ? 'যেমন: ব্যবসায়ী, চাকরিজীবী' : 'e.g., Business, Job'} />
          <Input label={t('monthlyIncome')} type="number" placeholder="50000" />
          <Select 
            label={t('children')} 
            options={students.map(s => ({ value: s.id, label: `${s.name} (${s.class})` }))}
          />
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
