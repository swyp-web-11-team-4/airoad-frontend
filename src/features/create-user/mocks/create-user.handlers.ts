import { HttpResponse } from "msw";

import { mockUsers } from "@/entities/user/mocks";
import { createHandlers } from "@/shared/lib/msw";
import type { User } from "@/shared/type";

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
