import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export const metadata = {
  title: 'Admin Panel – Veera Blue Metals',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
