export interface CreateBooking {
  productName: string;
  sender: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  receiver: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

export interface GetBooking {
  trackingCode?: string;
  id?: string;
}

export interface UpdateBooking {
    productName?: string;
    sender: {
      name?: string;
      address?: string;
      email?: string;
      phone?: string;
    };
    receiver: {
      name?: string;
      address?: string;
      email?: string;
      phone?: string;
    };
    status?: boolean;
}