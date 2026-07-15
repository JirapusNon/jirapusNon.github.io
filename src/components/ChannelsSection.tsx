'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import SectionKicker from '@/components/SectionKicker';
import { CHANNEL_ICONS } from '@/components/ChannelIcons';
import { SALES_CHANNELS } from '@/lib/constants';

export default function ChannelsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="channels"
      aria-labelledby="channels-heading"
      className={`channels-section catalog-section scroll-mt-20 section-surface-light ${visible ? 'channels-section--visible' : ''
        }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="channels-header section-intro">
          <SectionKicker variant="accent">ช่องทางการจัดจำหน่าย</SectionKicker>
          <h2
            id="channels-heading"
            className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]"
          >
            สั่งซื้อง่าย สะดวกทุกช่องทาง
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            เลือกช่องทางที่คุณสะดวกและคลิกเพื่อติดต่อสอบถามหรือสั่งซื้อสินค้าได้ทันที
          </p>
        </div>

        <ul className="channels-grid mt-8 lg:mt-10">
          {SALES_CHANNELS.map((channel, index) => {
            const Icon = CHANNEL_ICONS[channel.id];
            // ยังไม่มี URL จริง → ไม่ทำเป็นลิงก์ กันพาลูกค้าไปผิดร้าน
            const pending = 'pending' in channel;
            const Wrapper = pending ? 'div' : 'a';
            const linkProps = pending
              ? {}
              : {
                href: channel.url,
                target: '_blank',
                rel: 'noopener noreferrer',
              };

            return (
              <li
                key={channel.id}
                className={`channel-tile channel-tile--${channel.id} ${pending ? 'channel-tile--pending' : ''
                  }`}
                style={
                  { '--channel-delay': `${index * 50}ms` } as CSSProperties
                }
              >
                <Wrapper className="channel-tile__link" {...linkProps}>
                  <span className="channel-tile__chip" aria-hidden="true">
                    <Icon className="channel-tile__glyph" />
                  </span>

                  <span className="channel-tile__body">
                    <span className="channel-tile__name">{channel.name}</span>
                    <span className="channel-tile__meta">
                      {pending ? 'ยังไม่ได้ตั้งค่าลิงก์' : channel.handle}
                    </span>
                  </span>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
