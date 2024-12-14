// import {useTranslations} from 'next-intl';
// import {setRequestLocale} from 'next-intl/server';
// import PageLayout from '@/components/PageLayout';

// type Props = {
//   params: {locale: string};
// };

// export default function Contact({params: {locale}}: Props) {
//   // Enable static rendering
//   setRequestLocale(locale);

//   const t = useTranslations('home');

//   return (
//     <PageLayout title={t('title')}>
//       <div className="max-w-[490px]">
//         {t.rich('description', {
//           p: (chunks) => <p className="mt-4">{chunks}</p>,
//           code: (chunks) => (
//             <code className="font-mono text-white">{chunks}</code>
//           )
//         })}
//       </div>
//     </PageLayout>
//   );
// }
