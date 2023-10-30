namespace backend_zad.Services;
public interface ICallHandlingService<T1, T2>
{
    public void HandleCall(T1 clientCall, T2 serverResponses);
}