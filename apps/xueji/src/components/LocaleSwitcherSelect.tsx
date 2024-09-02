'use client'
import { useState, useTransition } from 'react'
import { CheckIcon, LanguageIcon } from '@heroicons/react/24/solid'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { Locale } from '../i18n/config'
import { setUserLocale } from '../i18n/locale'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

type Props = {
  defaultValue: string
  items: Array<{ value: string; label: string }>
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [local, setLocal] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  function handleChange(event: SelectChangeEvent) {
    setLocal(event.target.value as string)
    const locale = event.target.value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={isPending}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={local}
          label={label}
          // input={<LanguageIcon />}
          MenuProps={MenuProps}
          onChange={handleChange}>
          {items.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              <div className="flex">
                <div className="mr-2 w-4">
                  {item.value === defaultValue && <CheckIcon className="size-5 text-slate-600" />}
                </div>
                <span className="text-slate-900">{item.label}</span>
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
