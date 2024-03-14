'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { PrimaryButton } from '@/components/shared/button'
import { PATH } from '@/constants/path'
import { deleteQuestion } from '@/lib/actions/question.actions'

export default function EditDelBtnGroup({ questionId }: { questionId: string }) {
  const router = useRouter()
  const pathname = usePathname()

  function handleClickEditBtn() {
    router.push(`${PATH.QUESTIONS}/${questionId}/edit`)
  }

  async function handleClickDelBtn() {
    await deleteQuestion({ questionId: questionId.toString(), path: pathname })
  }

  return (
    <div className="flex shrink-0 items-center max-md:justify-end md:ml-auto">
      <PrimaryButton className="p-1" onClick={handleClickEditBtn}>
        <Image src="/assets/icons/edit.svg" alt="Edit" width={16} height={16} />
      </PrimaryButton>

      <PrimaryButton className="p-1" onClick={handleClickDelBtn}>
        <Image src="/assets/icons/trash.svg" alt="Delete" width={16} height={16} />
      </PrimaryButton>
    </div>
  )
}
