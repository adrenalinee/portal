import classes from "@/app/globals.module.css";
import { IconSearch } from "@tabler/icons-react";
import { CloseButton, Input } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function SearchInput ({
  searchKeyword,
  onFinish
}: {
  searchKeyword?: string
  onFinish?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState<string>(searchKeyword?? '')
  return (
    <Input
      // size="lg"
      variant="default"
      data-autofocus
      classNames={classes}
      leftSection={<IconSearch />}
      rightSection={<CloseButton
        onClick={() => {
          setKeyword('')
          const params = new URLSearchParams(searchParams)
          params.delete('k')
          router.replace(pathname + '?' + params.toString())

          if (onFinish) {
            onFinish()
          }
        }}
      />}
      rightSectionPointerEvents="all"
      autoFocus={true}
      placeholder="Search... + Enter"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key == 'Enter') {
          if (keyword === '') {
            const params = new URLSearchParams(searchParams)
            params.delete('k')
            router.replace(pathname + '?' + params.toString())
          } else {
            const params = new URLSearchParams(searchParams)
            params.set('k', keyword)
            router.replace(pathname + '?' + params.toString())
          }

          if (onFinish) {
            onFinish()
          }
        }
      }}
    />
  )
}