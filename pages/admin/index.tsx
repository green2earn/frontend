import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/components/admin/Dashboard";
import Header from "@/components/admin/Header";
import Orders from "@/components/admin/Orders";
import Products from "@/components/admin/Products";
import Sidebar from "@/components/admin/Sidebar";
import CreateProduct from "@/components/products/CreateProduct";
import AddProject from "@/components/projects/AddProject";
import Projects from "@/components/projects/Projects";
import { useAppSelector } from "@/stores/store";
import { useState } from "react";

const Admin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { isSelected, toggleAddProduct, toggleAddProject } = useAppSelector(
		(state) => state.toggle
	);

	return (
		<div className=" w-screen flex">
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

			<div
				className={` ${isOpen ? "width" : "width-small"} top-0 ${
					isOpen ? "left-[200px]" : "left-[70px]"
				} fixed h-screen overflow-y-scroll `}
			>
				<Header />
				{isSelected === 1 && <Dashboard />}
				{isSelected === 2 && <Products />}
				{isSelected === 3 && <Projects />}
				{isSelected === 5 && <Orders />}
				{toggleAddProduct && (
					<div
						className={` ${
							isOpen ? "width" : "width-small"
						} top-0 ${
							isOpen ? "left-[200px]" : "left-[70px]"
						} fixed h-screen overflow-y-scroll `}
					>
						<CreateProduct />
					</div>
				)}
				{toggleAddProject && (
					<div
						className={` ${
							isOpen ? "width" : "width-small"
						} top-0 ${
							isOpen ? "left-[200px]" : "left-[70px]"
						} fixed h-screen overflow-y-scroll `}
					>
						<AddProject />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProtectedRoute(Admin);
