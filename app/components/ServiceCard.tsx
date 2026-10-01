import Image from "next/image";
import Link from "next/link";
import Icon from "./ui/Icon";
import type { Service } from "@/app/lib/content";

/* One service card, shared by the ServicesOverview grid (/services) and the
   ServicesSlider (Home). Icon sits in an outlined circle; the CTA lives in a
   ruled footer with its own arrow disc. Hover is a border shift plus the glow
   token, never a lift or scale (CLAUDE.md Design Taste, reference 3). */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="focus-glow group flex h-full flex-col rounded-lg border border-n-200 bg-n-0 p-6 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-primary hover:shadow-[var(--shadow-glow)] md:p-7"
    >
      {/* A service with an illustration shows it in place of the icon disc,
          cropped to one 3:2 frame so titles line up across a row.
          Decorative (alt=""): the h3 names it. */}
      {service.image ? (
        <span className="relative block aspect-[3/2] w-full overflow-hidden rounded-md bg-n-50">
          <Image
            src={service.image.src}
            alt=""
            fill
            quality={90}
            sizes="(min-width: 901px) 33vw, (min-width: 601px) 50vw, 85vw"
            className="object-cover"
            style={{ objectPosition: service.image.position }}
          />
        </span>
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-n-200 text-brand-secondary transition-colors duration-150 group-hover:border-brand-primary">
          <Icon name={service.icon} className="h-5.5 w-5.5" />
        </span>
      )}
      <h3 className="mt-6 text-[18px] leading-[1.25] font-display font-semibold text-n-900">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-n-600">
        {service.description}
      </p>
      <span className="mt-6 flex items-center justify-between border-t border-n-100 pt-4 text-[13.5px] font-semibold text-brand-secondary">
        Learn more
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-n-50 transition-colors duration-150 group-hover:bg-brand-secondary group-hover:text-n-0">
          <Icon
            name="arrowUpRight"
            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </span>
    </Link>
  );
}
