import {ref} from 'vue'
import {useField, useForm} from 'vee-validate'
import {useToast} from "vue-toastification";

export function useAuth() {
    const toast = useToast();
    const {handleSubmit, handleReset} = useForm({
        validationSchema: {
            username(value: string) {
                if (value?.length >= 8) return true

                return 'Name needs to be at least 8 characters.'
            },

            password(value: string) {
                if (value?.length >= 8) return true

                return 'Name needs to be at least 8 characters.'
            },
        }
    })

    const username = useField('username')
    const password = useField('password')

    const loading = ref(false)

    const submit = handleSubmit(values => {
        toast.success(
            "Tizimga xo'sh kelibsiz"
        );
    })
    return {submit, username, password, loading};
}


