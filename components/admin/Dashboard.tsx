import OrderTable from "./OrderTable"
import ProductStatistic from "./ProductStatistic"
import SaleStatistics from "./SaleStatistics"
import Summary from "./Summary"

const Dashboard = () => {
  return (
    <div className='border-t-[1px] px-7 py-4'>
          <h2 className='text-[20px] font-[600]'>Dashboard</h2>
          <Summary />
          <div className='grid grid-cols-2 h-[400px] mt-8 gap-x-6'>
              <SaleStatistics />
              <ProductStatistic />
          </div>
          <OrderTable/>
    </div>
  )
}

export default Dashboard
