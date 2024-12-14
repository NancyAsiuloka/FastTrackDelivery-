export interface CreateBooking {
  serviceName: string;
  contactDetails: {
    phone: string;
    email: string;
    address: string;
  };
  parcels: {
    trackingNumber: string;
    productName: string;
    senderDetails: {
      name: string;
      address: string;
      phone: string;
    };
    recipientDetails: {
      name: string;
      address: string;
      phone: string;
    };
    weight: number;
    status: string;
    cost: number;
  }[];
}

export interface GetBooking {
  trackingNumber?: string;
  id?: string;
}

export interface UpdateBooking {
  serviceName?: string;
  contactDetails: {
    phone?: string;
    email?: string;
    address?: string;
  };
  parcels: {
    productName?: string;
    senderDetails: {
      name?: string;
      address?: string;
      phone?: string;
    };
    recipientDetails: {
      name?: string;
      address?: string;
      phone?: string;
    };
    weight?: number;
    status?: string;
    cost?: number;
  }[];
}
