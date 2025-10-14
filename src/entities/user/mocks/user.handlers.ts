import { HttpResponse } from "msw";

import { createHandlers } from "@/shared/lib/msw";
import { mockUsers } from "./user.fixtures";

export const userHandlers = [
  createHandlers.get(`/users`, () => mockUsers),

  createHandlers.get(`/users/:id`, ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === Number(id));

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: user,
    });
  }),
];
