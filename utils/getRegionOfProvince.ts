type Province = {
    name: string;
    region: string;
};
  
const provinces: Province[] = [
    // Các tỉnh thuộc vùng Bắc Bộ
    { name: 'Hà Nội', region: 'Đông Bắc ' },
    { name: 'Hải Phòng', region: 'Đông Bắc' },
    { name: 'Quảng Ninh', region: 'Đông Bắc' },
    { name: 'Bắc Ninh', region: 'Đông Bắc' },
    { name: 'Hải Dương', region: 'Đông Bắc' },
    { name: 'Hưng Yên', region: 'Đông Bắc' },
    { name: 'Hòa Bình', region: 'Đông Bắc' },
    { name: 'Hà Nam', region: 'Đông Bắc' },
    { name: 'Ninh Bình', region: 'Đông Bắc' },
    { name: 'Thái Nguyên', region: 'Đông Bắc' },
    { name: 'Vĩnh Phúc', region: 'Đông Bắc' },
    { name: 'Bắc Kạn', region: 'Đông Bắc' },
    { name: 'Lạng Sơn', region: 'Đông Bắc' },
    { name: 'Cao Bằng', region: 'Đông Bắc' },
    { name: 'Thái Bình', region: 'Đông Bắc' },
    { name: 'Tuyên Quang', region: 'Đông Bắc' },
    { name: 'Hà Giang', region: 'Đông Bắc' },
    { name: 'Phú Thọ', region: 'Đông Bắc' },
    { name: 'Bắc Giang', region: 'Đông Bắc' },
    //Tay Bac
    { name: 'Sơn La', region: 'Tây Bắc ' },
    { name: 'Điện Biên', region: 'Tây Bắc ' },
    { name: 'Lai Châu', region: 'Tây Bắc ' },
    { name: 'Lào Cai', region: 'Tây Bắc ' },
    { name: 'Yên Bái', region: 'Tây Bắc ' },
    { name: 'Hòa Bình', region: 'Tây Bắc ' },
    //Bắc Trung Bộ
    { name: 'Thanh Hóa', region: ' Bắc Trung Bộ' },
    { name: 'Nghệ An', region: ' Bắc Trung Bộ' },
    { name: 'Hà Tĩnh', region: ' Bắc Trung Bộ' },
    { name: 'Quảng Bình', region: ' Bắc Trung Bộ' },
    { name: 'Quảng Trị', region: ' Bắc Trung Bộ' },
    { name: 'Thừa Thiên Huế', region: ' Bắc Trung Bộ' },
    
    //Tây Nguyên:
    { name: 'Đà Nẵng', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Quảng Nam', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Quảng Ngãi', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Bình Định', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Phú Yên', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Khánh Hòa', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Ninh Thuận', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Bình Thuận', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Kon Tum', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Gia Lai', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Đắk Lắk', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Đắk Nông', region: ' Tây Nguyên và  Nam Trung Bộ' },
    { name: 'Lâm Đồng', region: ' Tây Nguyên và  Nam Trung Bộ' },
    //NamBo
    { name: 'Thành phố Hồ Chí Minh', region: ' Nam Bộ ' },
    { name: 'Bà Rịa – Vũng Tàu', region: ' Nam Bộ ' },
    { name: 'Bình Dương', region: ' Nam Bộ ' },
    { name: 'Bình Phước', region: ' Nam Bộ ' },
    { name: 'Đồng Nai', region: ' Nam Bộ ' },
    { name: 'Tây Ninh', region: ' Nam Bộ ' },
    { name: 'Cần Thơ', region: ' Nam Bộ ' },
    { name: 'An Giang', region: ' Nam Bộ ' },
    { name: 'Bạc Liêu', region: ' Nam Bộ ' },
    { name: 'Bến Tre', region: ' Nam Bộ ' },
    { name: 'Long An', region: ' Nam Bộ ' },
    { name: 'Cà Mau ', region: ' Nam Bộ ' },
    { name: 'Sóc Trăng', region: ' Nam Bộ ' },
    { name: 'Hậu Giang', region: ' Nam Bộ ' },
    { name: 'Trà Vinh', region: ' Nam Bộ ' },
    { name: 'Đồng Tháp', region: ' Nam Bộ ' },
    { name: 'Vĩnh Long', region: ' Nam Bộ ' },
    { name: 'Kiên Giang', region: ' Nam Bộ ' },
    { name: 'Tiền Giang', region: ' Nam Bộ ' },
    
]

 export const getRegionOfProvince = (provinceName: string): string | null => {
     const province = provinces.find((p) => p.name === provinceName);
    return province ? province.region : null;
  };