import { HttpResponse } from "msw";
import type { User } from "@/entities/user";
import { mockUsers } from "@/entities/user";
import { createHandlers } from "@/shared/lib/msw";
export const createUserHandlers = [
  createHandlers.post(`/users`, async ({ request }) => {
    const newUser = (await request.json()) as Omit<User, "id">;
    const user: User = {
      id: mockUsers.length + 1,
      ...newUser,
    };

    mockUsers.push(user);

    return HttpResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 },
    );
  }),
];
