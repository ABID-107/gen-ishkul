'use client';

import { useState } from 'react';
import { payments, students, courses } from '@/lib/mock-data';
import { Card, CardContent, Badge, Button, Modal, Input, Select, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Avatar } from '@/components/ui';
import { useLanguage } from '@/lib/language';

export default function PaymentsPage() {
  const { t, language } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesSearch = payment.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const completedPayments = payments.filter(p => p.status === 'completed');
  const totalRevenue = completedPayments.reduce((acc, p) => acc + (p.amount - (p.discount || 0)), 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);

  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'completed', label: t('common.completed') },
    { value: 'pending', label: t('common.pending') },
    { value: 'failed', label: t('failed') },
    { value: 'refunded', label: t('refunded') },
  ];

  const paymentMethodOptions = [
    { value: 'bKash', label: t('bkash') },
    { value: 'Nagad', label: t('nagad') },
    { value: 'Rocket', label: t('rocket') },
    { value: 'Bank', label: t('bank') },
    { value: 'Cash', label: t('cash') },
    { value: 'Card', label: t('card') },
  ];

  const paymentTypeOptions = [
    { value: 'admission', label: t('admissionFee') },
    { value: 'monthly', label: t('monthlyFee') },
    { value: 'exam', label: t('examFee') },
    { value: 'certificate', label: t('certificateFee') },
    { value: 'other', label: t('otherFee') },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">সম্পন্ন</Badge>;
      case 'pending':
        return <Badge variant="warning">বকেয়া</Badge>;
      case 'failed':
        return <Badge variant="destructive">ব্যর্থ</Badge>;
      case 'refunded':
        return <Badge variant="secondary">ফেরত</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">পেমেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">শিক্ষার্থীদের পেমেন্ট ট্র্যাক করুন</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          নতুন পেমেন্ট
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">মোট আয়</p>
            <p className="text-2xl font-bold text-emerald-600">৳{totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">বকেয়া</p>
            <p className="text-2xl font-bold text-amber-600">৳{pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">সম্পন্ন পেমেন্ট</p>
            <p className="text-2xl font-bold">{completedPayments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">বকেয়া পেমেন্ট</p>
            <p className="text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
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
                  placeholder="নাম বা ট্রানজেকশন আইডি দিয়ে সার্চ..."
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

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>শিক্ষার্থী</TableHead>
                <TableHead>কোর্স</TableHead>
                <TableHead>পরিমাণ</TableHead>
                <TableHead>মাধ্যম</TableHead>
                <TableHead>টাইপ</TableHead>
                <TableHead>ট্রানজেকশন</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar 
                        src={payment.student?.avatar}
                        fallback={payment.student?.name.charAt(0) || 'U'}
                        size="sm"
                      />
                      <span className="font-medium">{payment.student?.name || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{payment.course?.titleBn || 'N/A'}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-primary">৳{payment.amount.toLocaleString()}</p>
                      {payment.discount && (
                        <p className="text-xs text-muted-foreground">৳{payment.discount} ছাড়</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {payment.method === 'bKash' ? 'বিকাশ' :
                       payment.method === 'Nagad' ? 'নগদ' :
                       payment.method === 'Rocket' ? 'রকেট' :
                       payment.method === 'Bank' ? 'ব্যাংক' :
                       payment.method === 'Cash' ? 'ক্যাশ' : 'কার্ড'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {payment.type === 'admission' ? 'ভর্তি' :
                       payment.type === 'monthly' ? 'মাসিক' :
                       payment.type === 'exam' ? 'পরীক্ষা' :
                       payment.type === 'certificate' ? 'সনদ' : 'অন্যান্য'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-mono text-muted-foreground">
                      {payment.transactionId || 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {payment.paidAt 
                        ? new Date(payment.paidAt).toLocaleDateString('bn-BD')
                        : payment.dueDate
                        ? <span className="text-amber-600">Due: {new Date(payment.dueDate).toLocaleDateString('bn-BD')}</span>
                        : 'N/A'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {payment.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm">মার্ক</Button>
                          <Button variant="ghost" size="sm">রিমাইন্ড</Button>
                        </>
                      )}
                      {payment.status === 'completed' && (
                        <Button variant="ghost" size="sm">রসিদ</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Payment Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="নতুন পেমেন্ট যোগ করুন">
        <form className="space-y-4">
          <Select 
            label="শিক্ষার্থী" 
            options={students.map(s => ({ value: s.id, label: s.name }))}
          />
          <Select 
            label="কোর্স (ঐচ্ছিক)" 
            options={[{ value: '', label: 'কোর্স নির্বাচন করুন' }, ...courses.map(c => ({ value: c.id, label: c.titleBn }))]}
          />
          <Select label="পেমেন্ট ধরন" options={paymentTypeOptions} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="পরিমাণ (৳)" type="number" placeholder="0" />
            <Input label="ডিসকাউন্ট (৳)" type="number" placeholder="0" />
          </div>
          <Select label="পেমেন্ট মাধ্যম" options={paymentMethodOptions} />
          <Input label="ট্রানজেকশন আইডি (ঐচ্ছিক)" placeholder="BK123456789" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit">
              পেমেন্ট যোগ করুন
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
