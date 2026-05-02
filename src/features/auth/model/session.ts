export type SignInPayload = {
	username: string;
	password: string;
};

export type AdminSession = {
	username: string;
	signedInAt: string;
};
