import { Pagination, PaginationItem } from "@/components/ui/pagination"

export default function PaginationDemo() {
  return (
    <Pagination>
      <PaginationItem>Prev</PaginationItem>
      <PaginationItem>1</PaginationItem>
      <PaginationItem isActive>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem>Next</PaginationItem>
    </Pagination>
  )
}
