import Image from 'next/image';

export default function PolaroidFrame({ image, title, date }) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-900 shadow-xl border border-neutral-300 dark:border-neutral-700 rounded-sm p-2 pb-6 w-fit max-w-[340px] rotate-[1deg] hover:rotate-0 transition-transform duration-300">
        <div className="relative w-[300px] h-[300px] overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-3 text-center px-1">
          <p className="text-base font-hand text-neutral-700 dark:text-neutral-200">{title}</p>
          {date && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
              {new Date(date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
