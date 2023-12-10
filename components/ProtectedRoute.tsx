import { useAppSelector } from "@/stores/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = <P extends object>(
	WrappedComponent: React.ComponentType<P>
) => {
	const AuthenticatedRoute: React.FC<P> = (props) => {
		const router = useRouter();
		const isAuthenticated = useAppSelector(
			(state) => state.auth.isLoggedin
		);
		useEffect(() => {
			if (!isAuthenticated) {
				router.push("/");
			}
		}, [isAuthenticated, router]);

		return <WrappedComponent {...props} />;
	};

	return AuthenticatedRoute;
};

export default ProtectedRoute;
