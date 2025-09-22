import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbItemType {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[]
}

export function PageBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            {index === items.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={item.href}>
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </ShadBreadcrumb>
  )
}
