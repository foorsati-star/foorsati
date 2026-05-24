const handleRegister = async () => {

  try {

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {

      const { error: insertError } = await supabase
        .from("users")
        .insert({
          id: data.user.id,
          full_name: fullName,
          email,
          phone,
          role: "client",
        });

      if (insertError) {
        console.error(insertError);
        alert("تم إنشاء الحساب لكن حدث خطأ في حفظ البيانات");
        return;
      }

      alert("تم إنشاء الحساب بنجاح");

      window.location.href = "/choose-account";
    }

  } catch (err) {

    console.error(err);
    alert("حدث خطأ غير متوقع");

  } finally {

    setLoading(false);
  }
};