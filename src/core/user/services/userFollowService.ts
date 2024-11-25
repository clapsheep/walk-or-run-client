import router from "@/router"
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore();

export const userFollowService = {

  goToUserProfile(userId: number): void {
    router.push(`/user/${userStore.userId}`)
  }

}
