import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <div className="absolute right-[80px] top-8">
      <LocaleSwitcherSelect
        defaultValue={locale}
        items={[
          {
            value: 'en',
            label: t('en'),
          },
          {
            value: 'zh',
            label: t('zh'),
          },
        ]}
        label={t('label')}
      />
    </div>
  )
}
