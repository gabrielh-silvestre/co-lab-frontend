import { SupabaseClient } from "@supabase/supabase-js";
import { AuthController } from "../controller";
import { AuthSupabaseModel } from "../model";

export class AuthContainer {
  static buildSupabase(client: SupabaseClient): AuthController {
    const model = new AuthSupabaseModel(client);
    return new AuthController(model);
  }
}
