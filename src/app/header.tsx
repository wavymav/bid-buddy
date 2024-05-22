'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { formatToDollar } from '@/util/currency'

export function Header() {
  const [isVisible, setIsVisible] = useState(false)
  const notificationButtonRef = useRef(null)
  const session = useSession()

  const userId = session?.data?.user?.id

  return (
    <div className='bg-gray-200 py-2'>
      <div className='container flex items-center justify-between'>
        <div className='flex items-center gap-12'>
          <Link href='/' className='flex items-center gap-1 hover:underline'>
            <Image src='/logo.png' width='50' height='50' alt='Logo' />
            BidBuddy.com
          </Link>

          <div className='flex items-center gap-8'>
            <Link href='/' className='flex items-center gap-1 hover:underline'>
              All Auctions
            </Link>

            {userId && (
              <>
                <Link
                  href='/items/create'
                  className='flex items-center gap-1 hover:underline'
                >
                  Create Auction
                </Link>

                <Link
                  href='/auctions'
                  className='flex items-center gap-1 hover:underline'
                >
                  My Auctions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          {userId && (
            <>
              <NotificationIconButton
                ref={notificationButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notificationButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className='rounded-xl'>
                      <Link
                        className='hover:text=blue-500 text-blue-400'
                        onClick={() => {
                          setIsVisible(false)
                        }}
                        href={`/items/${item.data.itemId}`}
                      >
                        Someone outbidded you on{' '}
                        <span className='font-bold'>{item.data.itemName}</span>{' '}
                        by ${formatToDollar(item.data.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )}

          {session?.data?.user?.image && (
            <Image
              src={session.data.user.image}
              width='40'
              height='40'
              alt='user avatar'
              className='rounded-full'
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type='submit' onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
