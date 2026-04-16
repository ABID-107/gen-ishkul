'use client';

import { useState } from 'react';
import { students, batches } from '@/lib/mock-data';
import { Card, CardContent, Badge, Button, Avatar, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal, Input, Select } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function StudentsPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student => {
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.roll.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const statusOptions = [
    { value: 'all', label: t('allStudents') },
    { value: 'active', label: t('common.active') },
    { value: 'inactive', label: t('common.inactive') },
    { value: 'suspended', label: t('suspended') },
  ];

  const classOptions = [
    { value: 'hsc1', label: language === 'bn' ? 'HSC ১ম বর্ষ' : 'HSC 1st Year' },
    { value: 'hsc2', label: language === 'bn' ? 'HSC ২য় বর্ষ' : 'HSC 2nd Year' },
    { value: 'ssc', label: 'SSC' },
  ];

  const groupOptions = [
    { value: 'science', label: language === 'bn' ? 'বিজ্ঞান' : 'Science' },
    { value: 'commerce', label: language === 'bn' ? 'বাণিজ্য' : 'Commerce' },
    { value: 'arts', label: language === 'bn' ? 'মানবিক' : 'Arts' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('students.title')}</h1>
          <p className="text-muted-foreground">{t('students.subtitle')}</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {t('students.newStudent')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.totalStudents')}</p>
            <p className="text-2xl font-bold">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.active')}</p>
            <p className="text-2xl font-bold text-emerald-600">{students.filter(s => s.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('common.inactive')}</p>
            <p className="text-2xl font-bold text-amber-600">{students.filter(s => s.status === 'inactive').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{t('dashboard.activeBatches')}</p>
            <p className="text-2xl font-bold">{batches.reduce((acc, b) => acc + b.currentStudents, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('students.title')}</TableHead>
                <TableHead>{t('roll')}</TableHead>
                <TableHead>{t('class')}</TableHead>
                <TableHead>{t('group')}</TableHead>
                <TableHead>{t('session')}</TableHead>
                <TableHead>{t('batches.title')}</TableHead>
                <TableHead>{t('common.status')}</TableHead>
                <TableHead className="text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={student.avatar}
                        fallback={student.name.charAt(0)}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.group || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>{student.session}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.batchIds.slice(0, 2).map((batchId) => {
                        const batch = batches.find(b => b.id === batchId);
                        return batch ? (
                          <Badge key={batchId} variant="secondary" className="text-xs">
                            {batch.name.split(' - ')[1] || batch.name}
                          </Badge>
                        ) : null;
                      })}
                      {student.batchIds.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{student.batchIds.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'success' : student.status === 'inactive' ? 'warning' : 'destructive'}>
                      {student.status === 'active' ? t('common.active') : student.status === 'inactive' ? t('common.inactive') : t('suspended')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">{t('common.edit')}</Button>
                      <Button variant="ghost" size="sm">{t('common.view')}</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('students.newStudent')}>
        <form className="space-y-4">
          <Input label={t('studentName')} placeholder={language === 'bn' ? 'শিক্ষার্থীর পূর্ণ নাম' : 'Full name of student'} />
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('email')} type="email" placeholder="email@example.com" />
            <Input label={t('phone')} type="tel" placeholder="01XXX-XXXXXX" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label={t('roll')} placeholder="001" />
            <Select label={t('class')} options={classOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label={t('group')} options={groupOptions} />
            <Input label={t('session')} placeholder="2025-26" />
          </div>
          <Select label={t('guardian.title')} options={[{ value: '', label: language === 'bn' ? 'অভিভাবক নির্বাচন করুন' : 'Select Guardian' }]} />
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
