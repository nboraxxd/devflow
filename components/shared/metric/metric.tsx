import Image from 'next/image'

interface MetricProps {
  iconUrl: string
  alt: string
  value: number | string
  title?: string
  titles?: string
}

export default function Metric({ iconUrl, alt, value, title, titles }: MetricProps) {
  return (
    <div className="flex items-center gap-0.5">
      <Image src={iconUrl} alt={alt} width={16} height={16} />
      <p className="text-dark400_light800">
        <span className="small-medium">{value}</span>
        {title && titles && (
          <span className="small-regular"> {typeof value === 'number' && value <= 1 ? title : titles}</span>
        )}
      </p>
    </div>
  )
}
